# Graph Databases

Rather than developing a complete solution, the easiest way to get started, in a sandbox environment, is to go thorough the following steps.

## Working with Gremlin Directly
Instead of getting a Neptune instance you can work with Gremlin directly using a local graph database. This will require more setup that is beyond this walk-through but it is an option if you can't get a sandbox account or don't want to worry about costs for running a neptune cluster (it only cost me a dollar to run through a few tutorials). See the [Getting started with Gremlin](https://tinkerpop.apache.org/docs/current/tutorials/getting-started/) for more details.

## Neptune walk-through

1. Create a Neptune instance
    1. Go to aws console through https://cloud.churchofjesuschrist.org/main/environments
        * Note that you are running in N. Virginia (us-east-1)
    1. Once there go to the [Neptune service page](https://us-east-1.console.aws.amazon.com/neptune/home)
        * either click link above or search for "neptune" in the services search bar
    1. Then click Launch Amazon Neptune.
        1. Provide a friendly name for your cluster identifier
        1. Select the development template so you don't over provision for this test
        1. use a small instance size since we aren't going to load GB of data into it
        1. under Availability & durability, Multi-AZ deployment select no (save your portfolio some cash)
        1. Deploy in a VPC (update if you want)
        1. **IMPORTANT** under Notebook configuration, select Create notebook, and pick the smallest instance size.
            1. postfix it with a name like "demo-notebook".
            1. create an IAM role so you can access your notebook
            1. Select Direct access through Amazon SageMaker for easy startup
        1. add tags if you want
        1. under Additional options update the following
            1. Enable IAM DB authentication (best practice and easy to use)
            1. Backup retention period 1 day
            1. Make sure deletion protection is disabled so you can clean up after you are done.

2. Connect to Notebook
    1. go to [notebook page](https://us-east-1.console.aws.amazon.com/neptune/home?region=us-east-1#notebooks)
        * assumes you are running in us-east-1 region.
    1. select the notebook you want to open by clicking on the name
    1. click the button near the top of the page "Open notebook"
    1. once it opens click on the "Neptune" directory
    1. Now you have access to all of the samples and their associated tutorials.
    1. pick a tutorial and go to town.

3. Clean up to save money
    1. delete notebook
        1. Select notebook from notebooks section
        1. Select Stop action from actions menu
        1. Select Delete action from actions menu
        1. type in "delete" and click Delete
        1. wait for completion
        1. double check that notebook was deleted
    1. delete neptune cluster
        1. Select the neptune instance WITH IN the cluster you want to delete
        1. Select Delete action from the actions menu