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

// router.get("/dashboard/users/getByMonthAndYearssss", (req, res) => {
//   const FIRST_MONTH = 1;
//   const LAST_MONTH = 12;
//   const MONTHS_ARRAY = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   let TODAY = "2022-12-31T23:59:59";
//   let YEAR_BEFORE = "2022-01-01T00:00:00";

//   userSchema
//     .aggregate([
//       {
//         $match: {
//           createdAt: { $gte: YEAR_BEFORE, $lte: TODAY },
//         },
//       },
//       {
//         $group: {
//           _id: { year_month: { $substrCP: ["$createdAt", 0, 7] } },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { "_id.year_month": 1 },
//       },
//       {
//         $project: {
//           _id: 0,
//           count: 1,
//           month_year: {
//             $concat: [
//               {
//                 $arrayElemAt: [
//                   monthsArray,
//                   {
//                     $subtract: [
//                       { $toInt: { $substrCP: ["$_id.year_month", 5, 2] } },
//                       1,
//                     ],
//                   },
//                 ],
//               },
//               "-",
//               { $substrCP: ["$_id.year_month", 0, 4] },
//             ],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           data: { $push: { k: "$month_year", v: "$count" } },
//         },
//       },
//       {
//         $addFields: {
//           start_year: { $substrCP: [YEAR_BEFORE, 0, 4] },
//           end_year: { $substrCP: [TODAY, 0, 4] },
//           months1: {
//             $range: [
//               { $toInt: { $substrCP: [YEAR_BEFORE, 5, 2] } },
//               { $add: [LAST_MONTH, 1] },
//             ],
//           },
//           months2: {
//             $range: [
//               FIRST_MONTH,
//               { $add: [{ $toInt: { $substrCP: [TODAY, 5, 2] } }, 1] },
//             ],
//           },
//         },
//       },
//       {
//         $addFields: {
//           template_data: {
//             $concatArrays: [
//               {
//                 $map: {
//                   input: "$months1",
//                   as: "m1",
//                   in: {
//                     count: 0,
//                     month_year: {
//                       $concat: [
//                         {
//                           $arrayElemAt: [
//                             MONTHS_ARRAY,
//                             { $subtract: ["$$m1", 1] },
//                           ],
//                         },
//                         "-",
//                         "$start_year",
//                       ],
//                     },
//                   },
//                 },
//               },
//               {
//                 $map: {
//                   input: "$months2",
//                   as: "m2",
//                   in: {
//                     count: 0,
//                     month_year: {
//                       $concat: [
//                         {
//                           $arrayElemAt: [
//                             MONTHS_ARRAY,
//                             { $subtract: ["$$m2", 1] },
//                           ],
//                         },
//                         "-",
//                         "$end_year",
//                       ],
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       },
//       {
//         $addFields: {
//           data: {
//             $map: {
//               input: "$template_data",
//               as: "t",
//               in: {
//                 k: "$$t.month_year",
//                 v: {
//                   $reduce: {
//                     input: "$data",
//                     initialValue: 0,
//                     in: {
//                       $cond: [
//                         { $eq: ["$$t.month_year", "$$this.k"] },
//                         { $add: ["$$this.v", "$$value"] },
//                         { $add: [0, "$$value"] },
//                       ],
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           data: { $arrayToObject: "$data" },
//           _id: 0,
//         },
//       },
//     ])
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error.message }));
// });

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
