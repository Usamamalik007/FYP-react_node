import sys,os
# Takes first name and last name via command
# line arguments and then display them
print("Output from Python")
s1 = sys.argv[1]
# s =  "14.jpg"
ls = "calamari-predict --checkpoint model_00570000.ckpt --files  public/files/data/" + s1
print(os.system(ls))