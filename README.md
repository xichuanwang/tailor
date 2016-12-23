# tailor
A simple web application I made for my mother's tailor shop that allows her to create orders and notify customers of their orders' completion via text - completed as an exercise in creating something not related to work.

# learnings
- React saga's: seems like an alternative to thunk middleware, which is used in the React repositories at work (?)
- Flask's run: by default (`threaded=False`) launches a single synchronous server, which was super flaky and forced me to restart the server several times
- Circular imports: had so many issues setting it up initially and am still unsure of the best way to do it due to the interdependencies of `app`, `db`, and the models (which rely on `db`)
- Django is so magical!!! aka configuration vs. conformation: having to figure out things I took for granted, like serialization, in my own janky ways reminded me how much is done under the hood when I'm working with Django. I'm trying to think more about the scenarios/usecases that make one outshine the other, and so far I've gathered that Flask might be better when you have a spec, and you're sure you know exactly what you want to build. The configuration and time you put into developing it one way will be pretty inconvenient to undo if you later decide to head in a different direction, and the magic of Django allows you to adjust with more ease. On the other hand, the overhead of all the magic has its own shortcomings like unanticipated behavior (making something that is general yet easy to get up and running outta the box is hard), more difficulty debugging, and suboptimal default behavior.

# still unsure
- What are the pros and cons of using React saga's? What is the reasoning behind this side-effects approach?
- How does Flask link up with the Werkzeug? What is WSGI exactly? 
- What is the difference between Werkzeug, nginx, uWSGI?
- I created the databases by going into the Flask shell and running `db.create_all()`... how would I do this in a Docker file? I could put this command in the file that is run to start up the server, but I kept getting circular dependencies, which makes me also wonder: how are Flask apps supposed to be structured? (how did I do this at my last internship???)
- What are the pros/cons of using styled components? They're easy to use for something quick, but they feel limited. Maybe I need to read more into their docs.
- What are the pros/cons of using yaml files for storing variables like API keys when compared to env vars?
