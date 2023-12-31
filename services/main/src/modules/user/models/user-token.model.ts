import { modelOptions, prop } from '@typegoose/typegoose'
import { IsNotEmpty, IsString } from 'class-validator'
import { getProviderByTypegooseClass } from '@app/transformers/model.transformer'

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class BannedToken {
  @IsString()
  @IsNotEmpty()
  @prop({ required: true })
  token: string

  @prop({ type: Date, expires: '1d', default: Date.now })
  createdAt: Date
}

export const BannedTokenProvider = getProviderByTypegooseClass(BannedToken)
