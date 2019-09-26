require 'byebug'
def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  actors_length = those_actors.length 
  Movie
    .select(:title, :id)
    .joins(:actors)
    .where(actors: { name: those_actors})
    .group(:id)
    .having('COUNT(*) = (?)', actors_length) 
end
#'castings.movie_id'
=begin 
  SELECT movies.title, movies.id 
  FROM movies 
  JOINS actors -castings also included
  WHERE actors.name IN (?) 
  GROUP BY castings.movie_id 
  HAVING COUNT(*) = those_actors.length 
  
=end 

# 1920..2000
# 1929 % 10 
#9 
# year - (year%10)
def golden_age
  # Find the decade with the highest average movie score.
  Movie 
    .select('AVG(score), (yr/10)*10 AS decade')
    .group('decade')
    .order('AVG(score) DESC')
    .first.decade
end

=begin 
AVG(score) | decade
  30           1920
  20            1930
=end 

# sum(score) for each yr 
# --> SELECT SUM(score) AS total_year_score
# --> FROM movies GROUP BY yr 

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  Actor 
    .select("DISTINCT actors.name")
    .joins(:castings) 
    .where('castings.movie_id': Casting.joins(:actor).where('actors.name = (?)', name).pluck(:movie_id))
    .where('actors.name != ?', name)
    .pluck(:name)
end

# Actor.select(:name).joins(:castings).where (castings.movie_id IN <subquery>)
# Casting.select(:movie_id).joins(:actors).where('actors.name' = ?, name)

# .where('castings.id = (?)')
# SUBQUERIES Example:
# Post.where(user_id: User.where('age > ?', 20))
# One fetches user ids when pluck is applied on User
# Another query on posts when getting posts for the user ids obtained 

def actor_out_of_work
  # Find the number of actors in the database who have not appeared in a movie

end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"

end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.

end
