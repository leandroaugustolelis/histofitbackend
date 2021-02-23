import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import ICacheProvider from './CacheProvider/models/ICacheProvider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';
import EtheralMailProvider from './MailProvider/implementations/EtheralMailProvider';
import uploadConfig from '../../../config/upload';
import mailConfig from '../../../config/mail';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  uploadConfig.driver === 'disk' ? DiskStorageProvider : S3StorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtheralMailProvider)
    : container.resolve(SESMailProvider)
);

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider
);
