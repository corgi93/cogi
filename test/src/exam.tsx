// class SignInPage extends React.Component<ISignInPageProps> {
//
//     @observable private isLoading: boolean
//     @observable private email: string
//     @observable private password: string
//
//     constructor(props: ISignInPageProps) {
//         super(props)
//         this.isLoading = false
//         this.email = ''
//         this.password = ''
//     }
//
//     public render() {
//         const {t} = this.props
//         return (
//             <div className="mid_center" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 marginTop: '10rem',
//             }}>
//                 <img src={logo} alt="logo" style={{marginBottom: 20}}/>
//                 <div className="x_panel" style={{borderRadius: 5}}>
//                     <LoadingPanel
//                         isLoading={this.isLoading}
//                         t={t}>
//                         <form className="form-horizontal form-label-left input_mask">
//                             <p>{t('Please enter your account')}</p>
//                             <LabelInput type='text'
//                                         name={'email'}
//                                         value={this.email || this.props.auth.email}
//                                         onChange={this.onChangeEmail}
//                                         fontAwesome='fa-user'
//                                         placeholder={t('email')}/>
//                             <LabelInput type='password'
//                                         name={'password'}
//                                         value={this.password}
//                                         onChange={this.onChangePassword}
//                                         fontAwesome='fa-lock'
//                                         placeholder={t('password')}/>
//                             <Clearfix/>
//                             <div style={{
//                                 paddingLeft: '1rem',
//                                 paddingRight: '.5rem',
//                                 display: 'flex',
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                             }}>
//                                 <SignLanguageSetting/>
//                                 <Button type='submit' bsStyle="info" onClick={this.onClickLogin}>{t('login')}</Button>
//                             </div>
//                         </form>
//                     </LoadingPanel>
//                 </div>
//             </div>
//         )
//     }
