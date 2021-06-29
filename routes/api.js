var express = require("express");
var connection = require("../database");
var router = express.Router();
var { body, validationResult } = require("express-validator");
module.exports = router;

router.get("/products/", function (req, res, next) {
    var promise = connection.raw(`select * from product;`);
    promise
        .then(function (result) {
            var products = result[0];
            console.log(products);
            res.json({
                products: products,
            });
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
});
/* GET product page. */
router.get("/products/:id", function (req, res, next) {
    var requestedId = req.params["id"]; // Update this line
    var promise = connection.raw(`select * from product where id = ?`, [
        requestedId,
    ]);
    promise
        .then(function (result) {
            var products = result[0];
            res.json(products[0]);
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
});

router.get("/manufacturers/", function (req, res, next) {
    var promise = connection.raw(`select * from manufacturer;`);
    promise
        .then(function (result) {
            var manufacturers = result[0];
            console.log(manufacturers);
            res.json({
                manufacturers: manufacturers,
            });
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
});
/* GET manufacturers page. */
router.get("/manufacturers/:id", function (req, res, next) {
    var requestedId = req.params["id"]; // Update this line
    var promise = connection.raw(`select * from manufacturer where id = ?`, [
        requestedId,
    ]);
    promise
        .then(function (result) {
            var manufacturers = result[0];
            res.json(manufacturers[0]);
        })
        .catch(function (error) {
            console.log(error);
            res.send("Error");
        });
});




/* update a product */
router.post(
    "/products/:id",
    body("name").not().isEmpty(),
    body("price").not().isEmpty(),
    body("description").not().isEmpty(),
    body("image_url").not().isEmpty(),
    function (req, res, next) {
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
            promise
                .then(function (result) {
                    console.log("SQL insertion result", result);
                    // Redirect to products
                    res.json(201, req.body);
                })
                .catch(function (error) {
                    console.log("SQL errors:", error);
                    res.json(400, error);
                });
        }
    }
);

/* update a manufacturer */
router.post(
    "/manufacturers/:id",
    body("id").not().isEmpty(),
    body("name").not().isEmpty(),
    body("image_url").not().isEmpty(),
    function (req, res, next) {
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
            promise
                .then(function (result) {
                    console.log("SQL insertion result", result);
                    // Redirect to products
                    res.json(201, req.body);
                })
                .catch(function (error) {
                    console.log("SQL errors:", error);
                    res.json(400, error);
                });
        }
    }
);


// delete a product
router.delete("/products/:id", function (req, res, next) {

    var id = req.body.id;
    var promise = connection.raw("delete from product where id=?", [
        id,
    ]);
    promise
        .then(function (result) {
            console.log("SQL deletion result", result);
            // Redirect to products
            res.json(201, req.body);

        })
        .catch(function (error) {
            console.log("SQL errors:", error);
            res.json(400, error);
        });
});

// delete a manufacturer
router.delete("/manufacturers/:id", function (req, res, next) {

    var id = req.body.id;
    var promise = connection.raw("delete from manufacturer where id=?", [
        id,
    ]);
    promise
        .then(function (result) {
            console.log("SQL deletion result", result);
            // Redirect to products
            res.json(201, req.body);

        })
        .catch(function (error) {
            console.log("SQL errors:", error);
            res.json(400, error);
        });
});
