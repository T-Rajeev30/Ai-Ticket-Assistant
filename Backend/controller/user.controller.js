import User from "../models/user.model.js";
import { inngest } from "../inngest/client.inngest.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password, skills = [] } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      skills,
    });

    /// fire inngest event

    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    });

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    ////////// todo -- remove user as it contain password also init

    res.json({ user, token });
  } catch (error) {
    console.error("❌ Error in signup controller:", error);
    res.status(500).json({ error: "Signup Failed", details: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not Found" });

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login Failed", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = res.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401);
    });
    res.json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout Failed", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body;
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ err: "Forbidden" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    await User.updateOne(
      { email },
      { skills: skills.length ? skills : user.skills, role }
    );

    return res.json({ message: "User updated successfully " });
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};
