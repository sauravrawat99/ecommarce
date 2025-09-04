class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; // Mongoose query
    this.queryStr = queryStr; // URL params
  }

  // 🔎 Search
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // 🧩 Filter
  filter() {
    const queryCopy = { ...this.queryStr };

    // fields remove kar do jo filtering ke liye nahi hai
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // filtter for price and rating
    // operators (gte, lte etc.)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 📄 Pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
