class Integer
  # Integer#hash already implemented for you
end

# A hash function is a sequence of mathematical operations that deterministically
# maps any arbitrary data into a pre-defined range of values. 
# However, a good hash function satisfies the property of being uniform in how it
# distributes that data over its range of values.

# Ordering of elements is essential to hashing an Array or String. This means
# each element in an Array or String should be associated with its index during
# hashing. 

class Array
  def hash
    hash_num = 0
    self.each_with_index do |el, i|
     num = el * i  
     hash_num += num.hash
    end
    hash_num
  end
end

class String
  def hash
    alpha = ('a'..'z').to_a
    hash_num = 0
    self.each_char.with_index do |char, i|
      num = alpha.index(char.downcase) * i
      hash_num += num.hash
    end
    hash_num       
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    hash_num = 0
    self.each do |k, v|
      hash_num += k.object_id 
    end
    hash_num
  end
end
