require 'rails_helper'

RSpec.describe User, type: :model do

    it { should validate_presence_of(:username) }
    it { should validate_length_of(:password).is_at_least(6) }


    describe 'uniqueness' do 
        before(:each) do 
            create(:user) #using faker and factorybot
        end 
        it { should validate_uniqueness_of(:username) }
        it { should validate_uniqueness_of(:username) } 
    end

    # describe "#"


    describe '#is_password?' do 
        let(:user) { create(:user) }

        context 'with a valid password' do 
            it 'returns true' do 
                expect(user.is_password?('michael')).to be(true)
            end 
        end 

        context 'with invalid password' do 
            it 'returns false' do 
                expect(user.is_password?('michael2')).to be(false)
            end 
        end 
    end 


    describe '#reset_session_token!' do 
        let(:user) { create(:user) }

        it "resets the session token" do 
            sesh = user.session_token 
            new_sesh = user.reset_session_token! 
            expect(sesh == new_sesh).to be(false)
        end 
    end 

    describe '#ensure_session_token' do 
        let(:user) { create(:user) }

        it "ensures the session token" do 
            expect(user.session_token.nil?).to be(false)
        end 
    end 

    describe 'User::find_by_credentials' do 
        let(:user) { create(:user) }

        it "returns the correct user" do
            expect(User.find_by_credentials(user.username, "michael")).to eq(user)
        end
    end 
end 