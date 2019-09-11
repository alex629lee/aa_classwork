require_relative "employee"
class Manager < Employee
    attr_accessor :employees

    def initialize(name, salary, title, boss)
        super(name, salary, title, boss)
        @employees = [] 
    end

    def bonus(multiplier)
        sums = 0
        queue = @employees.dup

      until queue.empty?
        emp = queue.shift
        sums += emp.salary
        if emp.is_a?(Manager)
          queue += emp.employees
        end
      end
      sums  * multiplier
    end 


end 