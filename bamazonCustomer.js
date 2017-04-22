//Requiring the mysql package
var mysql = require("mysql"),
	inquirer = require("inquirer"),
	table = require("cli-table");


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "Bamazon"
});

connection.connect(function (err) {
	if (err) {
		throw err;
	}
	//Calling the start function 
	start();
});

//This function displays the table of products allowing the user to select
function start() {
	var coolTable = new table({
		head: ["ID", "Product", "Price"]
	});

//
connection.query("SELECT * FROM `products`", function (err, res) {
	if (err) {
		throw err;
	}
	//Looping through the response to push the values into an array then a table
	for (var i = 0; i < res.length; i++) {
		var products = [];
		products.push(res[i].id);
		products.push(res[i].product_name);
		products.push(res[i].department_name);
		products.push(res[i].price);
		products.push(res[i].stock_quantity);

		coolTable.push(products);
	}

	console.log(coolTable.toString());

	//Prompting the user for ID and quantity desired
	inquirer.prompt([
		{
			name: "product_id",
			type: "input",
			message: "Enter the ID of your desired product: "
		},{
			name: "units",
			type: "input",
			message: "Enter number of units you wish to buy: "
		}
		]).then(function (answer) {
			var idSelection = answer.product_id;
			var quantitySelection = parseInt(answer.units);

			placeOrder(idSelection, quantitySelection);
		})
	});
}
//Function that computates the product ID selection along with price 
function placeOrder(productID, productQuant) {
	connection.query("SELECT `stock_quantity`, `price` FROM `products` WHERE ?", [
	{
		id: productID
	}
	], function (err, res) {
		if (err) {
			throw err;
		}

		var currentQ = res[0].stock_quantity;

		//Conditional used to display whether we have enough inventory
		if (currentQ < productQuant) {
			console.log("Insufficient quantity in stock!");
			start();
		}

		else {
			//Calculating & updating the inventory qty & 
			//the purchase total after the users' selections are registered
			var newQuant = currentQ - productQuant;
			var price = productQuant * (res[0].price);

			connection.query("UPDATE `products` SET `stock_quantity` = " + newQuant + " WHERE ?", [ 
					{
						id: productID
					}
				], function (err, res) {
					if (err) {
						throw err;
					}

					console.log("This is the breakdown of your purchase! Subtotal($): " + price);
			})
		}
	});
};

// start();
// placeOrder();

//--------------------------------------------------------------------------------------------------------------

// console.log(("ID: " + res[0].id + " |"),("Product: " + res[0].product_name + " |"),("Price($): " + res[0].price));
	// console.log(("ID: " + res[1].id + " |"),("Product: " + res[1].product_name + " |"),("Price($): " + res[1].price));
	// console.log(("ID: " + res[2].id + " |"),("Product: " + res[2].product_name + " |"),("Price($): " + res[2].price));
	// console.log(("ID: " + res[3].id + " |"),("Product: " + res[3].product_name + " |"),("Price($): " + res[3].price));
	// console.log(("ID: " + res[4].id + " |"),("Product: " + res[4].product_name + " |"),("Price($): " + res[4].price));
	// console.log(("ID: " + res[5].id + " |"),("Product: " + res[5].product_name + " |"),("Price($): " + res[5].price));
	// console.log(("ID: " + res[6].id + " |"),("Product: " + res[6].product_name + " |"),("Price($): " + res[6].price));
	// console.log(("ID: " + res[7].id + " |"),("Product: " + res[7].product_name + " |"),("Price($): " + res[7].price));
	// console.log(("ID: " + res[8].id + " |"),("Product: " + res[8].product_name + " |"),("Price($): " + res[8].price));
	// console.log(("ID: " + res[9].id + " |"),("Product: " + res[9].product_name + " |"),("Price($): " + res[9].price));	
	
// 	var start = function(err, res){

// 		inquirer.prompt([{
// 			name: "product_id",
// 			type: "input",
// 			message: "Enter the ID of your desired product: "
// 		},{
// 			name: "units",
// 			type: "input",
// 			message: "Enter number of units you wish to buy: "
		
// 		}]).then(function(answer){
// 			var selection;
// 			for (var i = 0; i < res.length; i++) {
// 				if (res[i] === answer.selection) {
// 					selection = res[i];
// 				}
// 			};
// 		});
// 	};
// start();
	






