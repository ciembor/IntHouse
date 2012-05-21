#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import operator
import cgi
from lxml import etree

print('Content-type: text/html\n\n')

try:
  from collections import defaultdict
except Exception:
  print("Failed to import defaultdict.")
  sys.exit(1)

def setTemperature(tree, floor, room, value):
  tree.findall(".//floor[@id='" + floor + "']/room[@name='" + room + "']/temperature")[0].text = value

def setHumidity(tree, floor, room, value):
  tree.findall(".//floor[@id='" + floor + "']/room[@name='" + room + "']/humidity")[0].text = value

def setObject(tree, floor, room, index, value):
  tree.findall(".//floor[@id='" + floor + "']/room[@name='" + room + "']/objects/*[@index='" + index + "']")[0].text = value

try:  
  schema_file = open("xml/building.xsd", "r")
  schema_doc = etree.parse(schema_file)
  schema = etree.XMLSchema(schema_doc)
except Exception:
  print("Can't load XSD.")
  sys.exit(1)
  
try:
  form = cgi.FieldStorage()
  tree = etree.parse("xml/building.xml")
  if not schema.validate(tree):
    print("Input XML is not valid.")
    sys.exit(1)
    
except Exception:
  print("Can't load XML or FieldStorage is unavailable.")
  sys.exit(1)

try: 
  id = form['id'].value.split('_')
  value = form['value'].value
except Exception:
  print("Invalid form data.")
  sys.exit(1)
  
if (id[-1] == "temperature"):
  setTemperature(tree, id[0], id[1], value)
elif (id[-1] == "humidity"):
  setHumidity(tree, id[0], id[1], value)
else:
  setObject(tree, id[0], id[1], id[2], value)

if schema.validate(tree):
  tree.write("xml/building.xml", encoding="utf-8", xml_declaration=True, method="xml")
else:
  print("Output XML is not valid.")
  sys.exit(1)

print(id[0] + id[1] + id[2] + value);

