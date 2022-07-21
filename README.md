# TypeORM Save Bug Example
## Situation
In this sample project, we have a database with tables `room` and `guest` which have a custom many-to-many relation encoded in the table `room_to_guest`. The entries correspond to domain objects `Room` and `Guest` specified in `types.ts`.
## Problem
When we add a new room to the database, everything works fine. However, when we try to update this room, its relation `room_to_guest` is always orphaned and a new relation is created. With the default relation option, this leads to a failure of saving the room due to a `NOT NULL constraint`. We tried to overcome this by setting the `orphanedRowAction` in `room_to_guest` to `delete`, which indeed resolves the obtained error. But the problem is, that the relation will now be deleted when the room is updated. When we update the relation, i.e. a different `room_to_guest` relation is created, everything is correct, the new relation is saved and the old relation is deleted. However, when the relation is unchanged, according to the logs, it will be updated and afterwards deleted.
## Reproducing the behaviour
In the test for this repo, I create a domain object `Room` and store it twice in the `room` table. Then I receive the stored entity and compare it to the entity obtained from the save query which will currently fail due to the missing relation. To execute the test follow the steps below:
1. Download the repository
    git clone https://github.com/PascalStuckyTNG/typeorm-save-bug-example.git

2. Install the dependencies
    yarn install        # alternatively, npm install

3. Run tests
    yarn test           # alternatively, npm run test

**Expected result:** The test is green

**Actual result:** The test is red