# == Schema Information
#
# Table name: courses
#
#  id            :bigint           not null, primary key
#  name          :string
#  prereq_id     :integer
#  instructor_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Course < ApplicationRecord

    has_many :enrollments,
        primary_key: :id,
        foreign_key: :course_id,
        class_name: :Enrollment 

    has_many :enrolled_students,
        through: :enrollments,
        source: :user

     # has_one:
     # Specifies a one-to-one association with another class. This method should
     # only be used if the other class contains the foreign key. If the current
     # class contains the foreign key, then you should use #belongs_to instead. 

    belongs_to :prerequisite, 
        primary_key: :id, 
        foreign_key: :prereq_id, 
        class_name: :Course

    belongs_to :instructor, 
        primary_key: :id,
        foreign_key: :instructor_id,
        class_name: :User 

end
