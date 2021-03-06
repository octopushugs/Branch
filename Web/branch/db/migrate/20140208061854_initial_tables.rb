class InitialTables < ActiveRecord::Migration
  def change
	#Passwords as plaintext is bad, but it'll work for prototying.
	change_table :students do |t|
		t.string :username
		t.string :password
		t.string :email
		t.string :dob
		t.string :city
		t.string :phone
	end

	change_table :orgs do |t|
		t.string :name
		t.string :ppname
		t.string :ppphone
		t.string :ppemail
		t.string :ppskype
		t.boolean :approved
		t.string :username
		t.string :password
		t.string :description
		t.string :timezone
	end

	change_table :events do |t|
		t.integer :owner
		t.string :location
		t.string :description
		t.string :time
		t.string :date
	end
  end
end
