
json.extract! @party, :name
json.guests do 
  json.array! @party.guests do |guest|
    json.name guest.name 
    json.gifts do 
      json.array! guest.gifts do |gift| 
        json.title gift.title 
        json.description gift.description
      end 
    end 
  end 
end 


=begin
{
  name: ,
  guests: [ 

    {name: "", gifts: [
      gift_obj 
    ]},

    {name: "", gifts: [ 
      gift_obj 
    ]}

  ] 
} 
#guest is obj => name, gifts:[<Gift>, ...](title, ...)
#don't want created_at
=end