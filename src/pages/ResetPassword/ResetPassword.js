import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useManageForm } from '../../hooks'
import { ForgotPassContainer } from '../../containers/ForgotPassContainer'
import { Field } from '../../components/Forms/Field'
import { Button } from '../../components/Forms/Button'
import { Spinner } from '../../components/Spinner'
// Actions
import { forgotPassIsExpire, resetPassword } from '../../store/actions'

const ResetPasswordPage = ({
  forgotPassIsExpire,
  resetPassword,
  history,
  match,
  auth,
}) => {
  useEffect(() => {
    forgotPassIsExpire(match.params.token, history)
  }, [forgotPassIsExpire, match, history])

  const { onSubmit, onChange, isValid, validator, data } = useManageForm({
    fields: {
      password: '',
      newPassword: '',
    },
    connect: resetPassword,
    moreData: {
      token: match.params.token,
      history,
    },
  })
  const { password, newPassword } = data
  const { resetPassword: resetPasswordData } = auth
  const user = resetPasswordData ? resetPasswordData.user : null

  return !user ? (
    <Spinner />
  ) : (
    <ForgotPassContainer title="Reset your password.">
      <form onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="col-12">
            <div className="reset-user">
              <div
                styles={`background-image: url('${user.picture}');`}
                className="reset-user__picture"
              />
              <div className="reset-user__content">
                <h4 className="reset-user__name">
                  {user.name} {user.lastname}
                </h4>
                <p className="reset-user__username">@{user.username}</p>
              </div>
            </div>

            <p className="mb-2 pb-0">
              Strong passwords include numbers, letters, and punctuation marks.
            </p>
          </div>

          <Field
            type="password"
            placeholder="Type your new password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          >
            {validator.message('password', password, 'required|min:6')}
          </Field>

          <Field
            type="password"
            placeholder="Type your new password one more time"
            name="newPassword"
            value={newPassword}
            onChange={e => onChange(e)}
          >
            {validator.message('newPassword', newPassword, 'required|min:6')}
          </Field>

          <div className="col-12 d-flex justify-content-end mt-4">
            <Button
              text="Reset"
              type="submit"
              classes={!isValid ? 'disabled' : ''}
            />
          </div>
        </div>
      </form>
    </ForgotPassContainer>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { forgotPassIsExpire, resetPassword })(
  ResetPasswordPage
)
