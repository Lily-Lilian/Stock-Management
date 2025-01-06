object Form1: TForm1
  Left = 0
  Top = 0
  Caption = 'Form1'
  ClientHeight = 440
  ClientWidth = 624
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -12
  Font.Name = 'Segoe UI'
  Font.Style = []
  TextHeight = 15
  object IdHTTPServer: TIdHTTPServer
    Active = True
    Bindings = <>
    DefaultPort = 5500
    AutoStartSession = True
    OnCommandGet = IdHTTPServer1CommandGet
    Left = 256
    Top = 320
  end
  object FDConnection: TFDConnection
    Params.Strings = (
      
        'Database=C:\Users\HP\Documents\Embarcadero\Studio\Projects\Stock' +
        'Management\stock_db.db'
      'DriverID=SQLite')
    Left = 128
    Top = 320
  end
  object FDQuery: TFDQuery
    Connection = FDConnection
    Left = 384
    Top = 336
  end
end
