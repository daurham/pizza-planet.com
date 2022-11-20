INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …);
-- Add 3 users
INSERT INTO "User"(username, email, password, role)
VALUES ('daurham', 'daurham95@gmail.com', '1234', 'customer');
INSERT INTO "User"(username, email, password, role)
VALUES ('Bob', 'bob@gmail.com', '1234', 'chef');
INSERT INTO "User"(username, email, password, role)
VALUES ('Jini', 'jini@gmail.com', '1234', 'owner');

-- Add 3 Pizza
INSERT INTO "Pizza"
(name, popularity, price, calories, instructions, notes, img)
VALUES 
('Extra Pepperoni', 5, '$20.00', 500, '', '', 'https://www.chuckecheese.com/wp-content/uploads/2022/04/CEC-22-0063-Website-Menu-Page-Update_stuffed-crust.jpg');

INSERT INTO "Pizza"
(name, popularity, price, calories, instructions, notes, img)
VALUES 
('Hawaiian', 4, '$20.00', 400, '', '', 'https://assets.rbl.ms/24952787/origin.jpg');

INSERT INTO "Pizza"
(name, popularity, price, calories, instructions, notes, img)
VALUES 
('Extra Bacon', 3, '$20.00', 600, '', 'extra oily', 'https://www.thespruceeats.com/thmb/23NTwSODwjvMBSuc87GILHxD8t4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bacon-pizza-482053-hero-01-2f6c8ac218e54d16968e0dd8378cc1d4.jpg');


-- Add 3 Toppings

INSERT INTO "Topping"
(name, "pricingMeasurement", price, img)
VALUES 
('Bacon', 'lb', '$1.12', 'https://kristineskitchenblog.com/wp-content/uploads/2021/09/bacon-in-oven-square-.jpg');

INSERT INTO "Topping"
(name, "pricingMeasurement", price, img)
VALUES 
('Pinapple', 'lb', '$2.32', 'https://media.istockphoto.com/id/483137125/photo/pineapple-chunks.jpg?s=612x612&w=0&k=20&c=oKFnI3_kwDTgocOADEG0SjLl5M4bNwzBpbtsKAstVbk=');

INSERT INTO "Topping"
(name, "pricingMeasurement", price, img)
VALUES 
('Pepperoni', 'lb', '$0.45', 'https://m.media-amazon.com/images/I/31CE5rFMn-L._AC_SY350_.jpg');
