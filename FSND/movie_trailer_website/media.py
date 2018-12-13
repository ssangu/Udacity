class Movie(object):
    """ This is the Movie class. """
    def __init__(self, title, poster_image_url, trailer_youtube_url):
        """ Allocates space in memory for the instance of Movie object.

            Args:
                title: Title of the movie
                poster_image_url: Link to the poster of the movie
                trailer_youtube_url: Link to the movie's youtube trailer

        """
        self.title = title
        self.poster_image_url = poster_image_url
        self.trailer_youtube_url = trailer_youtube_url
