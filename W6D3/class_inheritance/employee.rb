class Employee 
    attr_reader :name, :title, :salary, :boss

    def initialize(name, salary, title, boss)
        @name = name 
        @salary = salary 
        @title = title 
        @boss = boss 
        if boss
          boss.employees << self
        end
    end 

    def bonus(multiplier)
        salary * multiplier 
    end 

end 