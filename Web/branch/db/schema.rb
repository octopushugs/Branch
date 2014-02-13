# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140210205318) do

  create_table "events", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "location"
    t.string   "description"
    t.string   "time"
    t.string   "date"
    t.integer  "org_id"
    t.integer  "zipcode"
    t.integer  "orgs_id"
  end

  create_table "orgs", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "ppname"
    t.string   "ppphone"
    t.string   "ppemail"
    t.string   "ppskype"
    t.boolean  "approved"
    t.string   "username"
    t.string   "password"
    t.string   "description"
    t.string   "timezone"
    t.integer  "zipcode"
    t.string   "pphandle"
    t.string   "pphandletype"
    t.string   "org_appointment_date"
  end

  create_table "selookups", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "student_id"
    t.integer  "event_id"
  end

  create_table "solookups", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "student_id"
    t.integer  "org_id"
  end

  create_table "student_event_lt", force: true do |t|
    t.integer "student_id"
    t.integer "event_id"
  end

  create_table "student_org_lt", force: true do |t|
    t.integer "student_id"
    t.integer "org_id"
  end

  create_table "students", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "password"
    t.string   "email"
    t.string   "dob"
    t.string   "city"
    t.string   "phone"
    t.integer  "zipcode"
    t.string   "full_name"
    t.string   "timezone"
  end

end
