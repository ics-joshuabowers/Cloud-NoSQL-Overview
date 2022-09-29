# Cloud NoSQL Overview

## Abstract
Have you found yourself asking "Which NoSQL database should I use?" or "How do these different paradigms work?" Then this presentation is for you. With so many options it can be difficult to decide whether you go with a property graph, document, or a key value database.  Here we will use a few examples to explore how they each work and how you can represent similar data in different ways.

## Model
We will be using some different datasets designed for different use cases in the databases.

## Setup 

### Neptune
For testing Neptune just have Neptune create a new notebook as part of the provisioning process. That is the easiest way to get started with Neptune.


### DocumentDB and DynamoDB
To set up DocumentDB and DynamoDB you will need access to the AWS console.

You will need a security group for SageMaker. It should have two inbound rules,

|Type|Protocol|Port Range|Source|
|:---|:-------|:---------|:-----|
|SSH|TCP|22|35.172.155.192/27|
|SSH|TCP|22|35.172.155.96/27|

It may vary though. So to make sure it will work you can temporarily create a cloud9 instance and then base the SageMaker security group off of the one created for cloud9. (That's how I discovered this 😁)

You will also need a security group for each database with an inbound rule allowing SageMaker access to the database. 

#### DocumentDB
 __You must first the security group before you create the DocumentDB cluster.__

When creating the security group you will need to define an inbound rule. The type should be TCP, port range 27017 
(or what ever port you want to use for your cluster) and the source should be SageMaker security group created previously.

