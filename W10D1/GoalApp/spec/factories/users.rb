FactoryBot.define do
  factory :user do
     username { Faker::Movies::StarWars.character }
     password { "michael" }
  end
end