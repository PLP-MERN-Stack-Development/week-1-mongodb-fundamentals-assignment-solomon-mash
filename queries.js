// --- Task 2 Queries ---
db.books.find({ genre: "Dystopian" });
db.books.find({ published_year: { $gt: 1954 } });
db.books.find({ author: "George Orwell" });
db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 25 } });
db.books.deleteOne({ title: "Wuthering Heights" });

// --- Task 3 Queries ---
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
db.books.find().skip(0).limit(5);
db.books.find().skip(5).limit(5);

// --- Task 4 Aggregations ---
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// --- Task 5 Indexes ---
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });

db.books.find({ title: "The Alchemist" }).explain("executionStats");
