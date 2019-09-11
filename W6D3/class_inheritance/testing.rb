require_relative "employee"
require_relative "manager"


ned = Manager.new("Ned", 1000_000, "Founder", nil)
darren = Manager.new("Darren", 78_000, "TA Manager", ned) 
shawna = Employee.new("Shawna", 12_000, "TA", darren)
david = Employee.new("David", 10_000, "TA", darren)


puts ned.bonus(5) # => 500_000
puts darren.bonus(4) # => 88_000
puts david.bonus(3) # => 30_000