program StockManagement;

uses
  Vcl.Forms,
  MainView in 'Views\MainView.pas' {Form1},
  UserModel in 'Models\UserModel.pas',
  ItemModel in 'Models\ItemModel.pas',
  AuthController in 'Controllers\AuthController.pas',
  StockController in 'Controllers\StockController.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
