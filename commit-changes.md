Routes
------

CAMPGROUND ROUTES
name        url                                 verb           description
================================================================================================
INDEX       /campgrounds                        GET             Displays list of all campgrounds
NEW         /campgrounds/new                    GET             Displays form for making new campground
CREATE      /campgrounds                        POST            Adds new campground to DB
SHOW        /campgrounds/:id                    GET             Shows info about campground `c` with `c._id == id` 
------------------------------------------------------------------------------------------------

COMMENT ROUTES (nested)
name        url                                 verb           description
================================================================================================
NEW         /campgrounds/:id/comments/new       GET            Displays form for making new comment
CREATE      /campgrounds/:id/comments           POST           Adds new comment to campground with given id


### Version 1

1.  Basic scaffolding in place:  app.js, landing.ejs, campgrounds.ejs.  No real functionality yet.

2.  Changes
    1. Create header and footer partials.
    2. Include bootstrap.  Some styling.

3.  Added creating new campground functionality
    1. setup new campground POST route
    2. added in body-parser 
    3. setup route to show form
    4. added basic form

4. Styled campgrounds page

5. Navbar and more styling
    1. added navbar to header.ejs
    2. styled add new campgrounds page (with inline style tags)

6. Add Mongoose and enable persistence of new campgrounds being added
    1. Installed and configured mongoose
    2. Setup campground model
    3. Refactored `app.get("campgrounds)` ake use of campground model inside of our projects routes

### Version 2

7. 
    1. Added `description` to campground model
    2. used `db.collection.drop()` to remove old, descriptionless data
    3. Added SHOW route (following RESTful routes, see bottom of page) to show.ejs (to show info on particular campgrounds)
        a. refactored new.ejs to include description text input
        b. refactored app.js to have new campgrounds saved to db with descriptions

### Version 3

8. Changes
    1. Refactoring: moved Campground schema into models/campgrounds.js
    2. Added seeds.js file (for creating sample seed data for application)
    3. Comments:
        a. Added models/comment.js
        b. Added a comments array attribute to `campgroundSchema`
        c. Changed SHOW route to display comments for campgrounds

### Version 4

9. Comments:  Added two nested routes for adding comments to campgrounds

### Version 5

10. Comments: styling
    - Added our first custom .css sheet

### Version 6

11. Authentification - Registration
    - Installed all required packages
    - Defined User model
    - Created `register.ejs` and corresponding GET and POST routes.

12. Authentification - Login
    - Created `login.ejs` and corresponding GET and POST routes
    - Added logout functionality
    - Added login-status specific navigational buttons (signup, login, logout)

### Version 7

13. Refactoring routes.

14. Changes
    - Associate users with comments
    - Save author's name to a comment automatically

### Version 9 (missed version 8)

15. Changes
    - Login protected create/post new campground routes
    - associated users with campgrounds

### Version 10

16. Editing Campgrounds
    - Edit campground button
        - Add method-override
        - Add Edit campground route
        - Add link to edit page
        - Add Update campground route
    Deleting Campgrounds
        - Add Destroy route
        - Add Delete button

17. User Authorization (via `checkCampgroundOwnership middleware`)
    - for editing campgrounds
    - for deleting campgrounds
    - Hide/show edit and delete buttons

18. Editing comments
    - Add Edit route for comments
    - Add Edit button
    - Add Update route for comments

    Deleting comments
    - Add Destroy route
    - Add Delete button

19. User Authorization for Comments
    - Hide/show edit/delete buttons depending on ownership
    - user auth for edit/delete comments
    - refactor middleware

20. Changes
    - Add in Flash (for alerts)
    - Improve redirections in all routes
    - Error handling improvement

21. Landing page improvements








    
    

