var express = require("express");
var connection = require("../database");
var router = express.Router();

var { body, validationResult } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect(302, "products");
});

router.get("/products/", function (req, res, next) {
  var promise = connection.raw(`select * from product;`);
  promise
    .then(function (result) {
      var products = result[0];
      res.render("products", {
        title: "Product Listing",
        description: "This page shows a list of products.",
        products: products,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});


/* GET products create form */
router.get("/products/create-form", function (req, res, next) {
  res.render("product-create-form", {
    title: "Product Create Form",
    description: "This page shows a form to create a product.",
  });
});

router.post(
  "/products/create-form",
  body("name").not().isEmpty(),
  body("price").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image_url").not().isEmpty(), function (req, res, next) {
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("product-create-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        `
      insert into product (name, description, image_url, price)
      values (?, ?, ?, ?)
     `,
        [req.body["name"], req.body["description"], req.body["image_url"], req.body["price"]]
      );
      promise.then(function (result) {
        console.log("SQL insertion result", result);
        // Redirect to products
        res.redirect(302, "/products");
      })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("product-create-form", {});
        });
    }
  }
);


/* GET products update form */
router.get("/products/:id/update-form", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw(`select * from product where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("product-update-form", {
        title: "Product Update Page",
        description: "This page shows a form to update a product",
        product: products[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

router.post(
  "/products/:id/update-form",
  body("name").not().isEmpty(),
  body("price").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image_url").not().isEmpty(), function (req, res, next) {
    var requestedId = req.params["id"];
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("product-update-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        `
      update product set name =? , description= ?, image_url= ?, price= ? 
      where id = ?
     `,
        [req.body["name"], req.body["description"], req.body["image_url"], req.body["price"], requestedId]
      );
      promise.then(function (result) {
        console.log("SQL insertion result", result);
        // Redirect to products
        res.redirect(302, "/products");
      })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("product-update-form", {});
        });
    }
  }
);

/* GET products delete form */

router.get("/products/:id/delete-form", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  res.render("product-delete-form", {
    title: "Product Delete Form",
    description: "This page shows a form to delete a product.",
    id: requestedId,
  });
});

router.post("/products/:id/delete-form", function (req, res, next) {
  var requestedId = req.body["id"];
  var promise = connection.raw(`delete from product where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      console.log("SQL insertion result", result);
      // Redirect to products
      res.redirect(302, "/products");
    })
    .catch(function (error) {
      console.log("SQL errors:", error);
      res.render("product-create-form", {});
    });
});


/* GET product page. */
router.get("/products/:id", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw(`select * from product where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("product", {
        title: "Product Page",
        description: "This page shows the details of a product",
        product: products[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});


/* GET manufacturer listing page. */
router.get("/manufacturers/", function (req, res, next) {
  console.log("hii");
  var promise = connection.raw(`select * from manufacturer;`);
  promise
    .then(function (result) {
      var manufacturers = result[0];
      console.log(result);
      res.render("manufacturers", {
        title: "Manufacturer Listing",
        description: "This page shows a list of manufacturer.",
        manufacturers: manufacturers,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

/* GET manufacturer create form */
router.get("/manufacturers/create-form", function (req, res, next) {
  res.render("manufacturer-create-form", {
    title: "Manufacturer Create Form",
    description: "This page shows a form to create a manufacturer.",
  });
});

router.post(
  "/manufacturers/create-form",
  body("id").not().isEmpty(),
  body("name").not().isEmpty(),
  body("image_url").not().isEmpty(), function (req, res, next) {
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("manufacturer-create-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        `
      insert into manufacturer (id, name, image_url)
      values (?, ?, ?)
     `,
        [req.body["id"], req.body["name"], req.body["image_url"]]
      );
      promise.then(function (result) {
        console.log("SQL insertion result", result);
        // Redirect to manufacturer
        res.redirect(302, "/manufacturers");
      })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("manufacturer-create-form", {});
        });
    }
  }
);

/* GET manufacturer update form */
router.get("/manufacturers/:id/update-form", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw(`select * from manufacturer where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      var manufacturers = result[0];
      console.log(manufacturers);
      res.render("manufacturer-update-form", {
        title: "Manufacturer Update Page",
        description: "This page shows a form to update a manufacturer",
        manufacturer: manufacturers[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

router.post(
  "/manufacturers/:id/update-form",
  body("id").not().isEmpty(),
  body("name").not().isEmpty(),
  body("image_url").not().isEmpty(), function (req, res, next) {
    var requestedId = req.params["id"];
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("manufacturer-update-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        `
      update manufacturer set id=? , name= ?, image_url= ?
      where id = ?
     `,
        [req.body["id"], req.body["name"], req.body["image_url"], requestedId]
      );
      promise.then(function (result) {
        console.log("SQL insertion result", result);
        // Redirect to manufacturers
        res.redirect(302, "/manufacturers");
      })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("manufacturer-update-form", {});
        });
    }
  }
);

/* GET manufacturer delete form */
router.get("/manufacturers/:id/delete-form", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  res.render("manufacturer-delete-form", {
    title: "Manufacturer Delete Form",
    description: "This page shows a form to delete a manufacturer.",
    id: requestedId,
  });
});

router.post("/manufacturers/:id/delete-form", function (req, res, next) {
  var requestedId = req.body["id"];
  var promise = connection.raw(`delete from manufacturer where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      console.log("SQL insertion result", result);
      // Redirect to manufacturer
      res.redirect(302, "/manufacturers");
    })
    .catch(function (error) {
      console.log("SQL errors:", error);
      res.render("manufacturer-create-form", {});
    });
});

/* GET manufacturer page. */
router.get("/manufacturers/:id", function (req, res, next) {
  var requestedId = req.params["id"];
  var promise = connection.raw(`select * from manufacturer where id = ?`, [requestedId]);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("products", {
        title: "Manufacturer Page",
        description:
          "This page shows a list of products from this manufacturer.",
        products: products,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});


module.exports = router;
