class Array

    def my_uniq
        hash = Hash.new 
        self.each { |ele| hash[ele] = true }
        hash.keys
    end 

    def two_sum
        pairs = []
        
        self.each_index do |i|
        ((i + 1)...self.length).to_a.each do |j|
            pairs << [i, j] if self[i] + self[j] == 0
        end
        end
    
        pairs
    end
    
    def my_transpose
        raise "cannot transpose a 1D array" if self.none? { |ele| ele.is_a? Array }
        dimension = self.first.count
        cols = Array.new(dimension) { Array.new(dimension) }
      
        dimension.times do |i|
          dimension.times do |j|
            cols[j][i] = self[i][j]
          end
        end
      
        cols
    end 
end 
