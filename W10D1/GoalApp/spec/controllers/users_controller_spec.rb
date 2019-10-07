require 'rails_helper'

RSpec.describe UsersController, type: :controller do 

  describe "GET #new" do 
    it "renders the users new" do
      get :new; 
      expect(response).to render_template(:new)
    end 
  end 
  
  describe "POST #create" do 
    context "with invalid params" do 
      it "renders the users new template" do
        post :create, params: {user: {username: "michael", password: ""}}
        expect(response).to render_template(:new)
      end 
    end 

    context "with valid params" do 
      it "redirects to the user's show page on success" do 
        post :create, params: {user: {username: "michael", password: "michael"}}
        expect(response).to redirect_to(user_url(User.find_by_credentials("michael", "michael")))
      end
    end 
  end 

  describe "GET #show" do 
    it "renders the users show" do
      User.create!(username: "michael", password: "michael")
      get :show, params: {id: 1}
      expect(response).to render_template(:show)
    end 
  end 

end
