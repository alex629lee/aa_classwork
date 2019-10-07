FactoryBot.define do
  factory :username do
    name { Faker::Movies::StarWars.character }
  end
end