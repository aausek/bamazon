//Requiring the mysql package
var mysql = require("mysql"),
	inquirer = require("inquirer");


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
	console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function (err, res) {
	if (err) {
		throw err;
	}
	console.log(("ID: " + res[0].id + " |"),("Product: " + res[0].product_name + " |"),("Price($): " + res[0].price));
	console.log(("ID: " + res[1].id + " |"),("Product: " + res[1].product_name + " |"),("Price($): " + res[1].price));
	console.log(("ID: " + res[2].id + " |"),("Product: " + res[2].product_name + " |"),("Price($): " + res[2].price));
	console.log(("ID: " + res[3].id + " |"),("Product: " + res[3].product_name + " |"),("Price($): " + res[3].price));
	console.log(("ID: " + res[4].id + " |"),("Product: " + res[4].product_name + " |"),("Price($): " + res[4].price));
	console.log(("ID: " + res[5].id + " |"),("Product: " + res[5].product_name + " |"),("Price($): " + res[5].price));
	console.log(("ID: " + res[6].id + " |"),("Product: " + res[6].product_name + " |"),("Price($): " + res[6].price));
	console.log(("ID: " + res[7].id + " |"),("Product: " + res[7].product_name + " |"),("Price($): " + res[7].price));
	console.log(("ID: " + res[8].id + " |"),("Product: " + res[8].product_name + " |"),("Price($): " + res[8].price));
	console.log(("ID: " + res[9].id + " |"),("Product: " + res[9].product_name + " |"),("Price($): " + res[9].price));
	
});
	
	var start = function(){

		inquirer.prompt([{
			name: "product_id",
			type: "input",
			message: "Enter the ID of your desired product: "
		},{
			name: "units",
			type: "input",
			message: "Enter number of units you wish to buy: "
		
		}]).then(function(answer){
			var selection;
			for (var i = 0; i < answer.length; i++) {
				answer[i]
			};
		})
	}






