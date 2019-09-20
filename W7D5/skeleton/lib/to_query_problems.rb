# == Schema Information
#
# Table name: cats
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  breed       :string
#
# Table name: toys
#
#  id          :integer      not null, primary key
#  name        :string
#  color       :string
#  price       :integer
#
# Table name: cattoys
#
#  id          :integer      not null, primary key
#  cat_id      :integer      not null, foriegn key
#  toy_id      :integer      not null, foreign key

require_relative '../data/query_tuning_setup.rb'

# For this part of the project you'll be be asking yourself:
# TO QUERY OR NOT TO QUERY? 

# For that is the question!
# For each of the following problems you will try to write each
# problem WITH and WITHOUT subqueries, testing the efficiency
# of each query as you go. 

def frey_example
  # Find all the cats that are the same color as the cat named 'Freyja'.
  # Including 'Freyja' in the results.
  # DO NOT USE A SUBQUERY

  execute(<<-SQL)
    SELECT
      color_cats.name
    FROM
      cats AS freyja_cats
    JOIN
      cats AS color_cats ON freyja_cats.color = color_cats.color
    WHERE
      freyja_cats.name = 'Freyja';
  SQL
end

def frey_example_sub
  # Find all the cats that are the same color as the cat named 'Freyja'.
  # Including 'Freyja' in the results.

  # Using Explain you can see these queries are very similiar! Since our 
  # subquery is only performed on one table it is more efficient to use a subquery 
  # in this scenario instead of building the larger table.
  execute(<<-SQL)
    SELECT
      cats.name
    FROM
      cats
    WHERE
      cats.color = (
                    SELECT  
                      cats.color
                    FROM
                      cats
                    WHERE
                      name = 'Freyja'
                    );
  SQL
end

def harder_example
  # Find the toys and price for all the cats with the 
  # breed 'British Shorthair'.
  # Order alphabetically by toys name. 
  # DO NOT USE A SUBQUERY

  # Whereas in this query it is more efficient to not perform a subquery 
  # because we don't have to do the extra cost of a large subquery.
  execute(<<-SQL)
    SELECT
      toys.name, toys.price
    FROM
      cats
    JOIN
      cattoys ON cats.id = cattoys.cat_id
    JOIN
      toys ON toys.id = cattoys.toy_id
    WHERE
      cats.breed = 'British Shorthair'
    ORDER BY
      toys.name ASC;
  SQL
end

def harder_example_sub
  # Find the toys and price for all the cats with the 
  # breed 'British Shorthair'.
  # Order alphabetically by toys name. 

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT
      toys.name, toys.price
    FROM
      toys
    WHERE 
      toys.id IN (SELECT
                    toys.id
                  FROM 
                    toys
                  JOIN 
                    cattoys ON toys.id = cattoys.toy_id
                  JOIN 
                    cats ON cats.id = cattoys.cat_id
                  WHERE
                    cats.breed = 'British Shorthair')
    ORDER BY
      toys.name ASC;
  SQL
end


def no_apples_for_blair
  # Blair has was too many apple toys! Find the name of all the cats that
  # own toys named `Apple` that aren't `Blair`. 
  # Order by cat name alphabetically.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
    SELECT 
      cats.name
    FROM 
      cats 
    INNER JOIN 
      cattoys
    ON 
      cats.id = cattoys.cat_id 
    INNER JOIN 
      toys
    ON 
      cattoys.toy_id = toys.id 
    WHERE 
      cats.name != 'Blair' AND toys.name = 'Apple' 
    ORDER BY 
      cats.name
  SQL
end


def no_apples_for_blair_sub
  # Blair has was too many apple toys! Find the name of all the cats that
  # own toys named `Apple` that aren't `Blair`. 
  # Order by cat name alphabetically.

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT 
      cats.name
    FROM 
      cats 
    INNER JOIN 
      cattoys ON cattoys.id = cats.id 
    WHERE  cats.name != 'Blair' AND cats.id IN (
      SELECT cattoys.cat_id
      FROM cattoys 
      INNER JOIN toys
      ON cattoys.toy_id = toys.id 
      WHERE toys.name = 'Apple' 
    )
    ORDER BY 
      cats.name
  SQL
end


def toys_that_brendon_owns
  # List the all the toy names for all the cats named 'Brendon'.
  # Order alphabetically by toy name. 

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
    SELECT toys.name 
    FROM toys
    INNER JOIN cattoys 
    ON cattoys.toy_id = toys.id
    INNER JOIN cats
    ON cats.id = cattoys.cat_id
    WHERE cats.name = 'Brendon' 
    ORDER BY toys.name
  SQL
end

def toys_that_brendon_owns_sub
  # List the all the toy names for all the cats named 'Brendon'.
  # Order alphabetically by toy name. 

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT toys.name 
    FROM toys
    INNER JOIN cattoys 
    ON cattoys.toy_id = toys.id
    WHERE cattoys.id IN (
      SELECT cattoys.id 
      FROM cattoys
      INNER JOIN cats 
      ON cats.id = cattoys.cat_id
      WHERE cats.name = 'Brendon' 
    )
    ORDER BY toys.name
  SQL
end

def price_like_shiny_mouse
  # There are multiple 'Shiny Mouse' toys that all have different prices.
  # Your goal is to list all names and prices of the toys with the same prices 
  # as the different 'Shiny Mouse' toys. 

  # Exclude the 'Shiny Mouse' toy from your results.
  # Order your alphabetically by toy name.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL) 
    SELECT 
      DISTINCT a.name, a.price
    FROM 
      toys AS a
    JOIN 
      toys AS b 
    ON b.price = a.price
    WHERE 
      b.name LIKE '%Shiny Mouse%' AND a.name NOT LIKE '%Shiny Mouse%' 
  SQL
end

def price_like_shiny_mouse_sub
  # There are multiple 'Shiny Mouse' toys that all have different prices.
  # Your goal is to list all names and prices of the toys with the same prices 
  # as the different 'Shiny Mouse' toys. 

  # Exclude the 'Shiny Mouse' toy from your results.
  # Order your alphabetically by toy name.

  # USE A SUBQUERY
  execute(<<-SQL) 
    SELECT 
      DISTINCT a.name, a.price 
    FROM 
      toys a
    WHERE 
      a.name NOT LIKE '%Shiny Mouse%' AND a.price IN (
        SELECT 
          b.price
        FROM 
          toys b
        WHERE 
          b.name LIKE '%Shiny Mouse%' 
      )
    ORDER BY a.name
  SQL
end

def just_like_orange
  # Find the breed of the cat named 'Orange'. 
  # Then list the cats names and the breed of all the cats of Orange's breed.
  # Exclude the cat named 'Orange' from your results.
  # Order by cats name alphabetically.

  # DO NOT USE A SUBQUERY
  execute(<<-SQL)
    SELECT 
      DISTINCT a.name, a.breed 
    FROM 
      cats AS a
    LEFT JOIN 
      cats AS b 
    ON 
      a.breed = b.breed 
    WHERE 
      b.name LIKE 'Orange' AND a.name NOT LIKE 'Orange' 
    ORDER BY 
      a.name
  SQL
end

def just_like_orange_sub
  # Find the breed of the cat named 'Orange'. 
  # Then list the cats names and the breed of all the cats of Orange's  breed.
  # Exclude the cat named 'Orange' from your results.
  # Order by cats name alphabetically.

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT 
      DISTINCT a.name, a.breed 
    FROM 
      cats AS a
    WHERE 
      a.name NOT LIKE 'Orange' AND a.breed LIKE (
        SELECT DISTINCT b.breed 
        FROM cats AS b
        WHERE b.name = 'Orange'
      )
    ORDER BY 
      a.name
  SQL
end



def toys_that_jet_owns
  # Find all of the toys that Jet owns. Then list the the names of all 
  # the other cats that own those toys as well as the toys names.
  # Exclude Jet from the results.
  # Order alphabetically by cat name. 

  # DO NOT USE A SUBQUERY

  execute(<<-SQL)
    SELECT 
      DISTINCT catsB.name, toysA.name 
    FROM
      cats AS catsA
    JOIN cattoys AS cattoysA ON catsA.id = cattoysA.cat_id 
    JOIN toys AS toysA ON toysA.id = cattoysA.toy_id 
    JOIN cattoys AS cattoysB ON toysA.id = cattoysB.toy_id 
    JOIN cats AS catsB ON catsB.id = cattoysB.cat_id 
    WHERE 
      catsA.name = 'Jet' AND catsB.name != 'Jet'
    ORDER BY 
      catsB.name 
  SQL

end

def toys_that_jet_owns_sub
  # Find all of the toys that Jet owns. Then list the the names of all 
  # the other cats that own those toys as well as the toys names.
  # Exclude Jet from the results.
  # Order alphabetically by cat name. 

  # USE A SUBQUERY
  execute(<<-SQL)
    SELECT 
      cats1.name, toys.name 
    FROM 
      toys
    JOIN 
      cattoys AS cattoys1 
    ON toys.id = cattoys1.toy_id 
    JOIN 
      cats AS cats1
    ON cattoys1.cat_id = cats1.id
    WHERE 
      cats1.name != 'Jet' AND toys.id IN (
        SELECT toys2.id
        FROM toys AS toys2 
        JOIN cattoys AS cattoys2 
        ON toys2.id = cattoys2.toy_id 
        JOIN cats AS cats2 
        ON cattoys2.cat_id = cats2.id 
        WHERE cats2.name = 'Jet'
      )
    ORDER BY cats1.name 
  SQL
end