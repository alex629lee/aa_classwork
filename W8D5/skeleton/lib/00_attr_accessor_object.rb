class AttrAccessorObject

  # def self.learn_tricks(*tricks)
  #       tricks.each do |trick| 
  #           define_method(trick) do |num_times = 1| 
  #               num_times.times do 
  #                   puts "#{@name} is #{trick}ing"
  #               end 
  #           end 
  #       end 
  #   end 


  def self.my_attr_accessor(*attributes)
    attributes.each do |attribute|
      define_method(attribute) do   #something.attribute
        self.instance_variable_get("@#{attribute}")
      end 
      define_method("#{attribute}=") do |val| 
        self.instance_variable_set("@#{attribute}", val)
      end 
    end 
  end
end
