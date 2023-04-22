from .models import Media

from django import forms

class File_form(forms.ModelForm):
    class Meta:
        model=Media
        fields = ('mediaId','username','title','time','File')