require "tdd_exercises"

describe "#my_uniq" do 
    it "returns unique elements of array" do 
        expect([1,2,1,3,3].my_uniq).to eq([1,2,3])
    end 
    
    it "does not return duplicate objects" do 
        expect([1,2,1,3,3].my_uniq).to_not eq([1,2,1,3,3])
    end 
end 

describe "#two_sum" do 
    it "returns all pairs of positions for elements that sum to zero" do 
        expect([-1, 0, 2, -2, 1].two_sum).to eq([[0, 4], [2, 3]])
    end 

    it "returns empty array when no pairs are found" do 
        expect([1,2,3,4,5].two_sum).to eq([]) 
    end 

    it "should not return a one dimensional array" do 
        expect([-1, 0, 2, -2, 1].two_sum).to_not eq([0, 4, 2, 3])
    end 
end

describe "#my_transpose" do
    it "transposes an array" do
        expect([[0, 1, 2],[3, 4, 5], [6, 7, 8]].my_transpose).to eq([[0, 3, 6], [1, 4, 7], [2, 5, 8]])
    end

    it "raises error when called on one dimensional array" do
        expect{([1, 2, 3].my_transpose)}.to raise_error(RuntimeError)
    end
end

