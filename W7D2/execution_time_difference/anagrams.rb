# Write a method #first_anagram? that will generate and store
# all the possible anagrams of the first string. Check if the
# second string is one of these.

def first_anagram?(first, second) 
    anagrams = [] 
    until anagrams.length == factorial(first.length) 
        checker = first.split("")
        anagram = []
        until checker.empty?
          checker.each_with_index do |char, i|
            letter = checker.sample
            checker.delete_at(checker.index(letter))
            anagram << letter 
          end
        end 
        if !anagrams.include?(anagram) 
            anagrams << anagram.join 
        end 
    end 
    anagrams.include?(second)
end 


def factorial(num) 
    return 1 if num <= 1 
    
    num * factorial(num-1)
end 
# p first_anagram?("trap", "tarp")

# p first_anagram?("gizmoid", "gizmoid")    #=> false
# p first_anagram?("elvis", "lives")    #=> true


    # "rat"
    # # {0=>"r", 1=>"a", 2=>"t"}

    # # [0,1,2][0,2,1]
    # # [1,2,0], [1,0,2]
    # # [2,0,1], [2,1,0]

    # base case: 
    # each over all letters in word 

    # Array.new(factorial(num)) {[]} 


def second_anagram?(first, second)
  first.each_char do |char|
    return false if !second.include?(char)
    second[second.index(char)] = ""
  end
  second == ""
end 
# p second_anagram?("gizmo", "sally")    #=> false
# p second_anagram?("elvis", "lives")    #=> true
    

def third_anagram?(first, second)
  
  jumble_sort(first) == jumble_sort(second)
  
end

def jumble_sort(string) 
    alphabet = ("a".."z").to_a
    sorted = false 
    string = string.split("") 
    until sorted 
        sorted = true 
        string.each_with_index do |el, i|
            next if i + 1 == string.length 
            j = i + 1 
            if alphabet.index(string[i]) > alphabet.index(string[j])
                string[i], string[j] = string[j], string[i] 
                sorted = false 
            end 
        end
    end 
    string.join
end 

# p third_anagram?("gizmo", "sally")    #=> false
# p third_anagram?("elvis", "lives")    #=> true


def fourth_anagram?(first, second)
  first_hash = hasher(first)
  second_hash = hasher(second)
  first_hash == second_hash
end

def hasher(string)
  hash = Hash.new(0)
  string.each_char do |char|
    hash[char] += 1
  end
  hash
end
p fourth_anagram?("gizmo", "sally")    #=> false
p fourth_anagram?("elvis", "lives")    #=> true