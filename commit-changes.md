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

