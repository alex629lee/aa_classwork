require 'date'
class Cat < ApplicationRecord
  COLORS = [ 'black', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown', 'gray', 'pink' ]  

  include ActionView::Helpers::DateHelper
  validates :birth_date, :name, presence: true 
  validates :color, inclusion: { in: COLORS }
  validates :sex, inclusion: { in: [ 'M', 'F'] }

  
  def age
    cat_bd = birth_date
    now = Date.today
    days = (now - cat_bd).to_i
    days / 365
  end

  def self.colors
    COLORS    
  end

  def self.today
    Date.today
  end
end
