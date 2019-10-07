require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user page' do 
    visit "users/new"
    expect(page).to have_content("Create account")
  end 

  feature 'signing up a user' do
    scenario 'shows username on the homepage after signup' do 
      visit "users/new"
      fill_in "user[username]", with: "pam"
      fill_in "user[password]", with: "pinkpink"
      click_on "Sign up"
      expect(page).to have_content("pam")
    end 
  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login' do 
    visit "users/new"
      fill_in "user[username]", with: "pam"
      fill_in "user[password]", with: "pinkpink"
      click_on "Sign up"
      expect(page).to have_content("pam")
  end 

end

feature 'logging out' do
  scenario 'begins with a logged out state' do

  end

  scenario 'doesn\'t show username on the homepage after logout' do

  end

end
