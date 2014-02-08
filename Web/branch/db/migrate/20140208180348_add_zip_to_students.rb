class AddZipToStudents < ActiveRecord::Migration
  def change
	  change_table :students do |t|
		  t.integer :zipcode
	  end
  end
end
