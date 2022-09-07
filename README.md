# note-taker-fullstack

## Functionality

When you open the application, you have to navigate to the notes page @ '/notes', where you will be shown any previously listed notes, and be prompted to enter in a new note. When you click save, the note appears in the list and can be clicked on to see the contents of what that note were. And you can refresh, which will keep any previously saved note. And after refreshing you would be able to permanently delete the note from the list.

## Issues

The only issue is that when you save a note, you have to refresh before being able to delete it. This is because the function to get and render the items form the json file into list items, though being in the promise after posting the note, doesn't update the data-note attribute right away to give the new note its respective id that it was assigned to be used in the delete function.