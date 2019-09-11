# PHASE 2


def convert_to_int(str)
  begin 
    Integer(str)
  rescue ArgumentError => e 
    # return nil if str.nil? 
    puts "Operation failed! Couldn't convert to Integer :("
    puts "Error was: #{e.message}"
  rescue StandardError => e  
    puts "Standard Error was: #{e.message}" 
  ensure 
    num ||= 0
  end 
end



# PHASE 3


FRUITS = ["apple", "banana", "orange"]

def reaction(maybe_fruit)
  if FRUITS.include? maybe_fruit
    puts "OMG, thanks so much for the #{maybe_fruit}!"
  else 
    raise StandardError 
  end 
end

def feed_me_a_fruit
  puts "Hello, I am a friendly monster. :)"

  begin
    puts "Feed me a fruit! (Enter the name of a fruit:)"
    maybe_fruit = gets.chomp
    reaction(maybe_fruit) 
  rescue StandardError => e 
    puts "That's not a fruit!" 
    retry if maybe_fruit == "coffee"
  end 
end  



# PHASE 4
class BestFriend
  def initialize(name, yrs_known, fav_pastime)
    if name.empty?
      raise ArgumentError.new('name must be at least 1 charachter')
    elsif fav_pastime.empty?
      raise ArgumentError.new("favourite past time must be at least 1 charachter")
    else
      @name = name
      @fav_pastime = fav_pastime
    end
    if yrs_known < 5
      raise ArgumentError.new("less than five years is not a bff")
    else
      @yrs_known = yrs_known
    end
  end

  def talk_about_friendship
    puts "Wowza, we've been friends for #{@yrs_known}. Let's be friends for another #{1000 * @yrs_known}."
  end

  def do_friendstuff
    puts "Hey bestie, let's go #{@fav_pastime}. Wait, why don't you choose. 😄"
  end

  def give_friendship_bracelet
    puts "Hey bestie, I made you a friendship bracelet. It says my name, #{@name}, so you never forget me." 
  end
end


