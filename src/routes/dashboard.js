const express = require("express");
const appointmentSchema = require("../models/appointment");
const userSchema = require("../models/user");

const router = express.Router();

router.get("/dashboard/users/getByMonths", (req, res) => {
  let TODAY = "2022-12-31T23:59:59";
  let YEAR_BEFORE = "2022-01-01T00:00:00";

  userSchema
    .aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE), $lte: new Date(TODAY) },
        },
      },
      { $group: { _id: { $month: "$createdAt" }, totalUsers: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalUsers: 1,
        },
      },
      { $sort: { month: 1 } },
    ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

router.get("/dashboard/users/getByMonthAndYear", (req, res) => {
  let TODAY = "2022-12-31T23:59:59";
  let YEAR_BEFORE = "2022-01-01T00:00:00";

  userSchema
    .aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE), $lte: new Date(TODAY) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { date: "$createdAt", format: "%Y-%m" } },
          totalUsers: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          monthAndYear: "$_id",
          totalUsers: 1,
        },
      },
      { $sort: { monthAndYear: 1 } },
    ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

router.get("/dashboard/appointment/getByMonths", (req, res) => {
  let TODAY = "2022-12-31T23:59:59";
  let YEAR_BEFORE = "2022-01-01T00:00:00";

  appointmentSchema
    .aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE), $lte: new Date(TODAY) },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAppointments: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalAppointments: 1,
        },
      },
      { $sort: { month: 1 } },
    ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

router.get("/dashboard/appointment/getByMonthAndYear", (req, res) => {
  let TODAY = "2022-12-31T23:59:59";
  let YEAR_BEFORE = "2022-01-01T00:00:00";

  appointmentSchema
    .aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE), $lte: new Date(TODAY) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { date: "$createdAt", format: "%Y-%m" } },
          totalAppointments: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          monthAndYear: "$_id",
          totalAppointments: 1,
        },
      },
      { $sort: { monthAndYear: 1 } },
    ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

router.get("/dashboard/users/getClientsVsNutritionist", (req, res) => {
  userSchema
    .aggregate([
      {
        $match: {
          role: { $in: ["client", "nutritionist"] },
        },
      },
      {
        $group: {
          _id: "$role",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          role: "$_id",
          total: 1,
        },
      },
    ])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

module.exports = router;
