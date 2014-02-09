module Api
	module V1
		class StudentsController < ApplicationController
			
			def index
		 
			end	

			def show
				
			end

			def student_orgs(id)

				
							
			end

			def create
				student = Student.new
				student.username = params[:username]
				student.password = params[:password]
				student.email = params[:email]
				student.dob = params[:dob]
				student.city = params[:city]
				student.phone = params[:phone]
				student.full_name = params[:full_name]
				student.zipcode = params[:zipcode]
				student.timezone = params[:timezone]

				student.save
				render :text => "ok"
			end
		
			private
				def student_params
					params.require(:student).permit(:password, :email, :dob, :city, :phone, :full_name)
				end	
		end
	end
end
