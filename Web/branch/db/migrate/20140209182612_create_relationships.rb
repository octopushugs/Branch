class CreateRelationships < ActiveRecord::Migration
  def change
    change_table :students do |t|
#      t.has_many :orgs
#      t.has_many :events
    end

    change_table :orgs do |t|
#      t.has_many :events
#      t.has_many :students
    end

    change_table :events do |t|
      t.belongs_to :orgs
#      t.has_many :students
    end
  end
end
