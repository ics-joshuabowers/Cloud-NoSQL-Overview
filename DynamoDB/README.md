# Key Value Databases

We will be using an adapted version of the [Northwind dataset](get with hierarchies ) in it's flattened JSON form. To represent the power of a document we have combined these flattened documents into rich hierarchies to take advantage of the mongodb api in DocumentDB and CosmosDB.

![Northwind ERD](https://www.trek10.com/assets/content_posts_2019-01-02-dynamodb-single-table-relational-modeling_northwind-erd.png)

<sub>Source: https://www.trek10.com/blog/dynamodb-single-table-relational-modeling</sub>

## Things to keep in mind
The dataset above is meant to demonstrate functionality not for testing performance. To test the performance of the document api you would need a much larger dataset. That can be found at https://bowerspro.com/joshua/fakedata/eCommerceData/. There I have generated data with millions of documents, you will need 7zip installed to unzip it but once you have the data unzipped there will be many files where each file should be an array of documents that you can loop through to insert into the desired database. This utilizes real text from the gutenberg project and public patent records to make the titles descriptions more realistic and searchable.


## Table Structure
Table Name: employees
partition key: employeeID
sort key: firstName, lastName, birthDate, status, employeeID