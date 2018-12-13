import fresh_tomatoes
import media

# Initialize your list of favorite movies by instantiating the class Movie
# with the following attributes
# movie title, link to movie poster and link to movie trailer
frozen = media.Movie("Frozen",
    "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg",  # NOQA
    "https://www.youtube.com/watch?v=TbQm5doF_Uc")

how_to_train_dragon = media.Movie("How to train your Dragon",
    "https://upload.wikimedia.org/wikipedia/en/9/99/How_to_Train_Your_Dragon_Poster.jpg",  # NOQA
    "https://www.youtube.com/watch?v=fVr3J3Ddz70")

finding_nemo = media.Movie("Finding Nemo",
    "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",  # NOQA
    "https://www.youtube.com/watch?v=SPHfeNgogVs")

toy_story = media.Movie("Toy Story",
    "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",  # NOQA
    "https://www.youtube.com/watch?v=KYz2wyBy3kc")

beauty_and_beast = media.Movie("Beauty and the Beast",
    "https://upload.wikimedia.org/wikipedia/en/d/d6/Beauty_and_the_Beast_2017_poster.jpg",  # NOQA
    "https://www.youtube.com/watch?v=e3Nl_TCQXuw")

shrek = media.Movie("Shrek",
    "https://upload.wikimedia.org/wikipedia/en/3/39/Shrek.jpg",  # NOQA
    "https://www.youtube.com/watch?v=W37DlG1i61s")

# Store the above favorite movies as a list
movies = [frozen, how_to_train_dragon, finding_nemo, toy_story,
          beauty_and_beast, shrek]

# Invoke the page to load the above favorite list of movies
fresh_tomatoes.open_movies_page(movies)
